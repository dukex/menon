class LessonStatus < ActiveRecord::Base
  belongs_to :lesson
  belongs_to :user

  validates :time, numericality: { greater_than: 0 }, presence: true

  scope :finished, -> { where finished: true }

  def finish!
    self.finished = true
    self.time ||= 1
    self.save!
  end
end
