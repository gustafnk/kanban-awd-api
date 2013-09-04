class Item < ActiveRecord::Base

  def self.states
    workflow.keys.map {|item| item.to_s }
  end

  def next_states
    Item.workflow[self.status.to_sym]
  end

  def primary_action?(state)
    state == next_states.reverse[0]
  end

  private

  def self.workflow
    {
      :backlog => ['working'],
      :working => ['backlog', 'verify'],
      :verify => ['working', 'done'],
      :done => ['working']
    }
  end

end
