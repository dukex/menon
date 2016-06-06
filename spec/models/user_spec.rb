require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:courses).with_foreign_key(:owner_id) }
  it { should have_many(:lesson_statuses) }

  describe '#enrollments' do
    it 'returns courses with a lesson status' do
      user = create(:user)
      course = create(:course)
      _course = create(:course)
      lesson = create(:lesson, course_id: course.id)

      lesson.status_for(user).save

      expect(user.enrollments).to eq([course])
    end
  end
end
