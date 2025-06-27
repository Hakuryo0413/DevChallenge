module Api
    module V1
        class ChallengesController <ApplicationController
            before_action :authenticate_user!, only: %i[ create update destroy]
            before_action :set_challenge, only: %i[ show update destroy ]
            before_action :authenrize_admin, only: %i[ create ]
            # GET api/v1/challenges#index
            def index
                # Show all challenges
                @challenges = Challenge.all
                render json: @challenges
            end

            # POST api/v1/challenges#create
            def create
                puts "RRRRRR"
                puts current_user.id
                puts "RRRRRR"
                # @challenge = Challenge.new(challenges_params.merge(user_id: current_user.id))
                @challenge = current_user.challenges.build(challenges_params)
                puts @challenge
                if @challenge.save
                    render json: { message: "Challenge created successfully", data: @challenge }
                else
                    render json: { message: "Failed to save challenge", data: @challenge.errors }
                end
            end

            # GET /api/v1/challenges/:id
            def show
                # challenge = Challenge.find(params[:id])
                if @challenge
                  render json: { message: "Challenge found", data: @challenge }
                else
                  render json: { message: "Challenge not found", data: @challenge.errors }
                end
            end

            # PATCH /api/v1/challenges/:id
            def update
                # challenge = Challenge.find(params[:id])
                if @challenge.update(challenges_params)
                    render json: { message: "Challenge found", data: @challenge }
                else
                    render json: { message: "Challenge not found", data: @challenge.errors }
                end
            end

            # DELETE /api/v1/challenges/:id
            def destroy
                # challenge = Challenge.find(params[:id])
                if @challenge.destroy
                    render json: { message: "Deleted successfully", data: @challenge }
                else
                    render json: { message: "Fail", data: @challenge.errors }
                end
            end

            private

                def authenrize_admin
                    render json: { message: "Forbidden action" } unless current_user.email == ENV["ADMIN_EMAIL"]
                end

                def set_challenge
                    @challenge = Challenge.find(params[:id])
                end

                def challenges_params
                    params.require(:challenge).permit(:title, :description, :start_date, :end_date, :image_url)
                end
        end
    end
end
