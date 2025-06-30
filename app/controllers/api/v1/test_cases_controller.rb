module Api
    module V1
        class TestCasesController <ApplicationController
            # before_action :authenticate_user!
            # before_action :set_challenge , only: %i[ create specific ]
            before_action :set_question, only: %i[ create ]

            def index
                @test_cases = TestCase.all
                render json: @test_cases
            end

            # def specific
            #     @questions = Question.where(challenge_id: @challenge.id)
            #     render json: @questions
            # end

            def create
                @test_case = @question.test_cases.build(test_cases_params)
                if @test_case.save
                    render json: { message: "Testcase created successfully", data: @test_case }, status: :ok
                else
                    render json: { message: "Testcase created fail", data: @test_case.errors.full_messages }, status: :unprocessable_entity
                end
            end

            # def show
            #     if @question
            #       render json: { message: 'Question found', data: @question }
            #     else
            #       render json: { message: 'Question not found', data: @question.errors }
            #     end
            # end

            private
                def set_question
                    @question = Question.find(params[:question_id])
                end

                def test_cases_params
                    params.require(:test_case).permit(:input, :expect_output, :is_hidden)
                end
        end
    end
end
