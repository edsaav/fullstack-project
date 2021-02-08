require 'rails_helper'

RSpec.describe Gif, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:external_id) }

    subject { create :gif }

    it { should have_many :users }
  end

  describe '#search' do
    let(:query) { Faker::Lorem.word }
    let(:page) { 3 }
    let(:opts) do
      {
        limit: 25,
        offset: 50,
        rating: 'g'
      }
    end

    let(:giphy_api_result) do
      OpenStruct.new(
        data: [
          OpenStruct.new(
            id: 'foo',
            images: OpenStruct.new(
              fixed_height: OpenStruct.new(url: 'http://test.com/foo')
            )
          )
        ]
      )
    end

    subject(:search) do
      Gif.search(query, page)
    end

    it 'should call the Giphy API with the correct options' do
      expect($giphy).to receive(:gifs_search_get).with(
        ENV['GIPHY_KEY'], query, opts
      )
      search
    end

    it 'should return normalized results' do
      allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
      expect(search.first.attributes).to eq Gif.new(
        external_id: 'foo',
        url_small: 'http://test.com/foo'
      ).attributes
    end

    context 'without page param' do\
      let(:opts) do
        {
          limit: 25,
          offset: 0,
          rating: 'g'
        }
      end

      it 'should default to first page' do
        expect($giphy).to receive(:gifs_search_get).with(
          ENV['GIPHY_KEY'], query, opts
        )
        Gif.search(query)
      end
    end

    # Exceptions

    context 'without a query string' do
      let(:query) { nil }

      it 'should raise an error' do
        expect{search}.to raise_error 'query required for search'
      end
    end

    context 'with empty query string' do
      let(:query) { ' ' }

      it 'should raise an error' do
        expect{search}.to raise_error 'query required for search'
      end
    end

    context 'with error from Giphy API' do
      it 'should raise an error' do
        allow($giphy).to receive(:gifs_search_get).and_raise GiphyClient::ApiError
        expect{search}.to raise_error StandardError
      end
    end
  end
end
