@RetrieveProduct
Feature:
  As a user,
  I want to read existing product entries from my product catalogue database,
  So that I can review what products currently exist in the system.

  Scenario:
    Given that I am passing valid "Red"
    When I attempt to bring back all related data
    Then I receive a success message
    And the data returned is "John" and "7"

