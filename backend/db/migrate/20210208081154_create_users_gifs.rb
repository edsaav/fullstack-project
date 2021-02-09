class CreateUsersGifs < ActiveRecord::Migration[6.0]
  def change
    create_table :users_gifs do |t|
      t.belongs_to :user, null: false
      t.belongs_to :gif, null: false
      t.index ["user_id", "gif_id"], name: "index_users_gifs_on_user_id_and_gif_id", unique: true

      t.timestamps
    end
  end
end
