class Item < ActiveRecord::Base

  def states
    {
      :backlog => ['working'],
      :working => ['backlog', 'verify'],
      :verify => ['working', 'done'],
      :done => ['working']
    }
  end

  def next_states
    states[self.status.to_sym]
  end

  def primary_action?(state)
    state == next_states.reverse[0]
  end
end
