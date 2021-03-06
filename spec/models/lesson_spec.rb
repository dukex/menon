require 'rails_helper'

RSpec.describe Lesson, type: :model do
  it { should have_many(:statuses).class_name('LessonStatus') }
  it { should belong_to(:course) }

  describe '#status_for' do
    it 'returns status for user' do
      user = create :user
      lesson = create :lesson

      status = create :lesson_status, user_id: user.id, lesson_id: lesson.id

      expect(lesson.status_for(user)).to eql(status)
    end

  end

  describe '#finish!' do
    it 'finish the status' do
      user = create :user
      lesson = create :lesson
      status = create :lesson_status, user_id: user.id, lesson_id: lesson.id

      lesson.finish!(user)

      expect(status.reload.finished).to eql(true)
    end
  end
end
