class CreateGifs < ActiveRecord::Migration[6.0]
  def change
    create_table :gifs do |t|
      t.string :external_id, null: false
      t.string :title
      t.string :url_large
      t.string :url_small

      t.timestamps
    end
  end
end
