class CreateLessonStatuses < ActiveRecord::Migration
  def change
    create_table :lesson_statuses do |t|
      t.references :lesson, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.float :time
      t.boolean :finished

      t.timestamps null: false
    end
  end
end
