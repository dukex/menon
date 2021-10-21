require 'rails_helper'

RSpec.describe LessonsController, type: :controller do
  describe 'GET show' do
    it 'assigns @lesson' do
      sign_in create(:user)
      lesson = create :lesson

      get :show, params: { id: lesson.id, course_id: lesson.course.id }

      expect(assigns(:lesson)).to eq(lesson)
    end

    it 'renders the show template' do
      sign_in create(:user)
      lesson = create :lesson

      get :show, params: { id: lesson.id, course_id: lesson.course.id }

      expect(response).to render_template('show')
    end
  end

  describe 'GET next' do
    it 'redirects to next lesson' do
      sign_in create(:user)
      course = create :course
      lesson = create :lesson, course_id: course.id
      next_lesson = create :lesson, course_id: course.id

      get :next, params: { id: lesson.id, course_id: course.id }

      expect(response).to redirect_to(course_lesson_path(course, next_lesson))
    end

    it 'redirects to the course when not found lesson' do
      sign_in create(:user)
      course = create :course
      lesson = create :lesson, course_id: course.id

      get :next, params: { id: lesson.id, course_id: course.id }

      expect(response).to redirect_to(course_path(course))
    end
  end


  describe 'GET previous' do
    it 'redirects to previous lesson' do
      sign_in create(:user)
      course = create :course
      previous_lesson = create :lesson, course_id: course.id
      lesson = create :lesson, course_id: course.id

      get :previous, params: { id: lesson.id, course_id: course.id }

      expect(response).to redirect_to(course_lesson_path(course, previous_lesson))
    end

    it 'redirects to the course when not found lesson' do
      sign_in create(:user)
      course = create :course
      lesson = create :lesson, course_id: course.id

      get :next, params: { id: lesson.id, course_id: course.id }

      expect(response).to redirect_to(course_path(course))
    end
  end
end
