class Lesson < ActiveRecord::Base
  extend FriendlyId
  belongs_to :course
  has_many :statuses, class_name: 'LessonStatus', dependent: :destroy

  validates :course_id, presence: true

  friendly_id :name, use: [:slugged, :finders]

  def status_for(user)
    LessonStatus.where(user_id: user.id, lesson_id: id).first_or_create!
  end

  def finish!(user)
    status_for(user).finish!
  end
end
