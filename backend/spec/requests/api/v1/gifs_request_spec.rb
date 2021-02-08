require 'rails_helper'

RSpec.describe "Api::V1::Gifs", type: :request do

  describe "GET /search" do
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

    it "returns http success" do
      allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
      get "/api/v1/gifs/search?query=foo&page=3"
      expect(response).to have_http_status(:success)
    end

    context 'without a page param' do
      it 'is still a valid request' do
        allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
        get "/api/v1/gifs/search?query=foo"
        expect(response).to have_http_status(:success)
      end
    end

    context 'without a query param' do
      it 'is responds with an unprocessable entity error' do
        allow($giphy).to receive(:gifs_search_get).and_return giphy_api_result
        get "/api/v1/gifs/search?page=3"
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
