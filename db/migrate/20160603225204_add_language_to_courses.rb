class AddLanguageToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :language, :string, default: 'en'
  end
end
