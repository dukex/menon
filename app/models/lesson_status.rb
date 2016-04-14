class LessonStatus < ActiveRecord::Base
  belongs_to :lesson
  belongs_to :user

  def finish!
    self.finished = true
    self.save!
  end
end
