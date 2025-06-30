# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_06_30_104912) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.text "image_url"
    t.index ["user_id"], name: "index_challenges_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "challenge_id", null: false
    t.string "title"
    t.text "description"
    t.text "starter_code"
    t.text "test_cases"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "level"
    t.integer "points", default: 0
    t.index ["challenge_id"], name: "index_questions_on_challenge_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "code", null: false
    t.string "status", null: false
    t.text "result"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "question_id", null: false
    t.index ["question_id"], name: "index_submissions_on_question_id"
    t.index ["user_id"], name: "index_submissions_on_user_id"
  end

  create_table "test_cases", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.text "input", null: false
    t.text "expect_output", null: false
    t.boolean "is_hidden", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_test_cases_on_question_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.integer "total_points", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "challenges", "users"
  add_foreign_key "questions", "challenges"
  add_foreign_key "submissions", "questions"
  add_foreign_key "submissions", "users"
  add_foreign_key "test_cases", "questions"
end
