module Api
  module V1
    class UsersController < ApplicationController
      def index
        top_users = User.order(total_points: :desc).limit(10)
        render json: {
          code: 200,
          message: "Top 10 users",
          data: top_users.map { |user| user.as_json(only: [ :id, :email, :total_points ]) }
        }, status: :ok
      end
    end
  end
end
