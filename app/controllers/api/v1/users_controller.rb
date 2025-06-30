module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show]

      def index
        top_users = User.order(total_points: :desc).limit(10)
        render json: {
          code: 200,
          message: "Top 10 users",
          data: top_users.map { |user| user.as_json(only: [:id, :email, :total_points]) }
        }, status: :ok
      end

      def show
        render json: { message: "User found", data: @user }, status: :ok
      end

      private

      def set_user
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "User not found" }, status: :not_found
      end
    end
  end
end
