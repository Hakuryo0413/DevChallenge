module Api
    module V1
        class QuestionsController <ApplicationController
            # before_action :authenticate_user!
            before_action :set_challenge, only: %i[ create specific destroy ]
            before_action :set_question, only: %i[ show destroy ]

            def index
                @questions = Question.all
                render json: @questions
            end

            def specific
                @questions = Question.where(challenge_id: @challenge.id)
                render json: @questions
            end

            def create
                @question = @challenge.questions.build(question_params)
                if @question.save
                    render json: { message: "Question created successfully", data: @question }
                else
                    render json: { message: "Question created fail", data: @question.errors }
                end
            end

            def show
                if @question
                  render json: { message: "Question found", data: @question }
                else
                  render json: { message: "Question not found", data: @question.errors }
                end
            end

            def destroy
                # challenge = Challenge.find(params[:id])
                if @question.destroy
                    render json: { message: "Deleted successfully", data: @question }
                else
                    render json: { message: "Fail", data: @question.errors }
                end
            end


            private
                def set_challenge
                    @challenge = Challenge.find(params[:challenge_id])
                end

                def set_question
                    @question = Question.find(params[:id])
                end

                def question_params
                    params.require(:question).permit(:title, :level, :description, :starter_code, :points, test_cases_attributes: [ :input, :expect_output, :is_hidden ])
                end
        end
    end
end
