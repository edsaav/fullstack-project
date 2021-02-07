require 'rails_helper'

RSpec.describe Gif, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:external_id) }
  end
end
