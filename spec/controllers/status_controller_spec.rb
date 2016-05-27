require 'rails_helper'

RSpec.describe StatusController, type: :controller do
  describe "POST create" do
    it 'creates new status with correct time' do
      sign_in user = create(:user)
      lesson = create :lesson

      post :create, lesson_id: lesson, course_id: lesson.course, status: { time: 2 }, format: :json

      expect(lesson.status_for(user).time).to eql(2.0)
    end

    it 'updates user status when exists' do
      sign_in user = create(:user)
      lesson = create :lesson
      expect(lesson.status_for(user).time).to eql(nil)

      post :create, lesson_id: lesson, course_id: lesson.course, status: { time: 20 }, format: :json

      expect(lesson.status_for(user).time).to eql(20.0)
      expect(LessonStatus.count).to eql(1)
    end

    it 'responds not content' do
      sign_in create(:user)
      lesson = create :lesson

      post :create, lesson_id: lesson, course_id: lesson.course, status: { time: 2 }, format: :json

      expect(response).to have_http_status(:no_content)
    end
  end

  describe "POST finish" do
    it 'updates status to finished' do
      sign_in user = create(:user)
      lesson = create :lesson

      post :finish, lesson_id: lesson, course_id: lesson.course, format: :json

      expect(lesson.status_for(user).finished).to be_truthy
    end
  end
end
