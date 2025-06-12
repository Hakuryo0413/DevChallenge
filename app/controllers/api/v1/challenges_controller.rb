module Api
    module V1
        class ChallengesController <ApplicationController
            skip_before_action :verify_authenticity_token

            #GET api/v1/challenges#index
            def index
                #Show all challenges
                @challenges = Challenge.all
                render json: @challenges
            end 

            #POST api/v1/challenges#create
            def create
                puts 'RRRRRR'
                puts params
                puts 'RRRRRR'

                challenge = Challenge.new(challenges_params)
                if challenge.save
                    render json: {message: 'Challenge created successfully', data: challenge}
                else 
                    render json: {message: 'Failed to save challenge', data: challenge.errors}
                end
            end

            #GET /api/v1/challenges/:id
            def show
                challenge = Challenge.find(params[:id])
                if challenge
                  render json: { message: 'Challenge found', data: challenge }
                else
                  render json: { message: 'Challenge not found', data: challenge.errors }
                end
              end
              
            #PATCH /api/v1/challenges/:id
            def update
            end

            #DELETE /api/v1/challenges/:id
            def destroy
                challenge = Challenge.find(params[:id])
                if challenge.destroy
                    render json: { message: 'Deleted successfully', data: challenge}
                else
                    render json: { message: 'Fail', data: challenge.errors}
                end
            end

            private
                def challenges_params
                    params.require(:challenge).permit(:title, :description, :start_date, :end_date)
                end
        end
    end
end
