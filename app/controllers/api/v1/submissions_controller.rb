module Api
    module V1
        class SubmissionsController <ApplicationController
            before_action :authenticate_user!
            before_action :set_question, only: %i[ create ]


            def index
                @submissions = Submission.all
                render json: @submissions
            end

            def create
                @submission = @question.submissions.build(submission_params.merge(user: current_user))
                if @submission.save
                    render json: { message: "Submission created successfully", data: @submission }
                else
                    render json: { message: "Submission created fail", data: @submission.errors }
                end
            end

            private
                def set_question
                    @question = Question.find(params[:question_id])
                end

                def submission_params
                    params.require(:submission).permit(:code, :status)
                end

                def add_points_if_accepted
                  return unless status == "Accepted"
                  user.increment!(:total_points, question.points)
                end
        end
    end
end
