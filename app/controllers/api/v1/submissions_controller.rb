module Api
    module V1
        class SubmissionsController <ApplicationController
            before_action :authenticate_user!
            before_action :set_question, only: %i[ create ]


            def index
                @submissions = Submission.all
                render json: { code: 200, message: "All submissions", data: @submissions }, status: :ok
            end

            def create
                @submission = @question.submissions.build(submission_params.merge(user: current_user))
                if @submission.save
                  render json: { message: "Submission created successfully", data: @submission }, status: :ok
                else
                  render json: {
                    message: "Submission creation failed",
                    errors: @submission.errors.full_messages
                  }, status: :unprocessable_entity
                end
              end
              

            private
                def set_question
                    @question = Question.find(params[:question_id])
                    return render json: { message: "Question not found" }, status: :not_found unless @question

                end

                def submission_params
                    params.require(:submission).permit(:code, :status)
                end

               
        end
    end
end
