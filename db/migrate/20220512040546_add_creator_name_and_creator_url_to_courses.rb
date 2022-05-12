class AddCreatorNameAndCreatorUrlToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :creator_name, :string
    add_column :courses, :creator_url, :string
  end
end
