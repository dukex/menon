class AddLanguageToCourses < ActiveRecord::Migration[4.2]
  def change
    add_column :courses, :language, :string, default: 'en'
  end
end
