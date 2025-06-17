module Api
    module V1
        class SubmissionsController <ApplicationController
            before_action :authenticate_user!
            before_action :set_challenge

            def index
                @submissions = Submission.all
                render json: @submissions
            end

            def create
                @submission = @challenge.submissions.build(submission_params.merge(user: current_user))
                if @submission.save
                    render json: {message: 'Submission created successfully', data: @submission}
                else 
                    render json: {message: 'Submission created fail', data: @submission.errors}
                end
            end

            private
                def set_challenge
                    @challenge = Challenge.find(params[:challenge_id])
                end

                def submission_params
                    params.require(:submission).permit(:code)
                end
        end
    end
end
    