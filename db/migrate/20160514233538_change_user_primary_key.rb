class ChangeUserPrimaryKey < ActiveRecord::Migration[4.2]
  def change
    execute 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'

    add_column :users, :uuid, :uuid, default: "uuid_generate_v4()", null: false

    execute 'ALTER TABLE "users" DROP "id" CASCADE'
    change_table :users do |t|
      t.rename :uuid, :id
    end
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"

  end
end
