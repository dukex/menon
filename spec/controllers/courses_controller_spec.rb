require 'rails_helper'

RSpec.describe CoursesController, type: :controller do
  describe 'GET index' do
    it 'assigns @courses' do
      courses = 2.times.map { create :course }

      get :index

      expect(assigns(:courses)).to eq(courses)
    end

    it 'renders the index template' do
      get :index

      expect(response).to render_template('index')
    end
  end

  describe 'GET show' do
    it 'assigns @course' do
      course = create :course

      get :show, id: course

      expect(assigns(:course)).to eq(course)
    end

    it 'renders the show template' do
      course = create :course

      get :show, id: course

      expect(response).to render_template('show')
    end
  end

  describe 'GET resume' do
    it 'redirect to the next lesson' do
      user = create :user
      sign_in user
      course = create :course
      lesson2 = create :lesson, course_id: course.id, position: 2
      lesson3 = create :lesson, course_id: course.id, position: 3
      lesson1 = create :lesson, course_id: course.id, position: 1

      get :resume, id: course
      expect(response).to redirect_to course_lesson_path(course, lesson1)

      lesson1.finish! user
      get :resume, id: course
      expect(response).to redirect_to course_lesson_path(course, lesson2)

      lesson2.finish! user
      get :resume, id: course
      expect(response).to redirect_to course_lesson_path(course, lesson3)

      lesson3.finish! user
      get :resume, id: course
      expect(response).to redirect_to course_path(course)
    end
  end
end
