require 'rspec/core/shared_context'

module ApiHelpers

  extend RSpec::Core::SharedContext

  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token

    {
      'Authorization': "Bearer #{token}"
    }
  end

end
