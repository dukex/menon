require 'importer/youtube'

class Course < ActiveRecord::Base
  extend FriendlyId
  has_many :lessons, -> { order('position ASC') }, dependent: :destroy
  has_many :statuses, class_name: 'LessonStatus', through: :lessons

  belongs_to :owner, class_name: "User"

  validates :name, presence: true

  friendly_id :name, use: [:slugged, :finders]

  def self.import_from_youtube(url, user)
    importer = Importer::Youtube.new url, user.id
    importer.import!
  end

  def progress_for(user)
    (statuses.finished.where(user_id: user.id).count*100) / lessons.count
  end

  def enrolled?(user)
    return statuses.where(user_id: user.id).exists?
  end
end
