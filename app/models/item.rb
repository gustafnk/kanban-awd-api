class Item < ActiveRecord::Base
  def next_states
    case self.status
    when 'backlog'
      ['working']
    when 'working'
      ['backlog', 'verify']
    when 'verify'
      ['working', 'done']
    when 'done'
      ['working']
    end
  end

  def primary_action?(state)
    state == next_states.reverse[0]
  end
end
