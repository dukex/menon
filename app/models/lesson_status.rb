class LessonStatus < ActiveRecord::Base
  belongs_to :lesson
  belongs_to :user

  scope :finished, -> { where finished: true }

  def finish!
    self.finished = true
    self.save!
  end
end
