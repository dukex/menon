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
end
