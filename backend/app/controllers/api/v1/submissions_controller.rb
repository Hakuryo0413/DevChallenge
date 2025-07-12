module Api
  module V1
    class SubmissionsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_question, only: %i[create]

      def index
        @submissions = Submission.all
        render json: { code: 200, message: "All submissions", data: @submissions }, status: :ok
      end

      def create
        # 🔐 Tạo cache key từ code + tất cả test case input
        cache_key = submission_cache_key(@question.id, submission_params[:code], @question.test_cases)

        if (cached_result = $redis.get(cache_key)).present?
          Rails.logger.info("✅ HIT cache")
          result = JSON.parse(cached_result)
          return render json: { message: "Cached result", data: result }, status: :ok
        end

        @submission = @question.submissions.build(submission_params.merge(user: current_user))

        if @submission.save
          results = []
          all_passed = true

          @question.test_cases.each do |tc|
            judge_result = Judge0Service.submit_code(
              language_id: @submission.language_id || 71,
              source_code: @submission.code,
              stdin: tc.input
            )
            puts judge_result
            output = judge_result.body["stdout"].to_s.strip
            expected = tc.expect_output.to_s.strip
            passed = output == expected

            all_passed &&= passed

            results << {
              input: tc.input,
              expect_output: expected,
              actual_output: output,
              passed: passed
            }
          end

          final_status = all_passed ? "Accepted" : "Failed"
          @submission.update(status: final_status, result: results.to_json)

          response_data = {
            submission: @submission,
            status: final_status,
            results: results
          }

          # 💾 Save vào Redis cache
          $redis.set(cache_key, response_data.to_json)
          Rails.logger.info "✅ Redis SET key: #{cache_key}"

          render json: {
            message: "Submission created successfully",
            data: response_data
          }, status: :ok
        else
          render json: {
            message: "Submission creation failed",
            errors: @submission.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def set_question
        @question = Question.find_by(id: params[:question_id])
        render json: { message: "Question not found" }, status: :not_found unless @question
      end

      def submission_params
        params.require(:submission).permit(:code, :status, :language_id)
      end

      # 🔑 Tạo key từ question + code + toàn bộ input test case
      def submission_cache_key(question_id, code, test_cases)
        combined_input = test_cases.map(&:input).join
        "submission:#{question_id}:#{Digest::SHA256.hexdigest(code + combined_input)}"
      end
    end
  end
end
