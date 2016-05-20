require 'rails_helper'

RSpec.describe CoursesHelper, type: :helper do
  describe '#course_progress_for' do
    it 'returns curent course progress' do
      user = create :user
      course = create :course, lessons: 2.times.map { create :lesson  }
      expect(helper.course_progress_for(user, course)).to eq("0%")
      course.lessons.first.finish!(user)
      expect(helper.course_progress_for(user, course)).to eq("50%")
    end
  end
end
