require 'rails_helper'

RSpec.describe LessonStatus, type: :model do
  it { should belong_to :lesson }
  it { should belong_to :user }

  it '#finished' do
    status = create :lesson_status, finished: true
    create :lesson_status, finished: false
    expect(LessonStatus.finished.count).to eql(1)
    expect(LessonStatus.finished.first).to eql(status)
  end

  it '#finish!' do
    status = create :lesson_status, finished: false
    status.finish!
    expect(status.finished).to eql(true)
  end
end
