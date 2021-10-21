class AddInformationToLessons < ActiveRecord::Migration[4.2]
  def change
    add_column :lessons, :description, :text
    add_column :lessons, :thumbnail_url, :string
    add_column :lessons, :published_at, :date
  end
end
