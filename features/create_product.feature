@CreateProduct
Feature:
  As a user, I want to create new product entries in my product catalogue database, so that I can store new products into the system.

  Scenario: valid product

    Given that I am passing valid "Purple", "Joe" and "11"
    When I attempt to add this data to the product catalogue
    Then I receive a success message
    And the data has been entered into the database.


  Scenario: not valid product

    Given that I am passing valid "Orange" and "Mary" but invalid "12.a59"
    When I attempt to add this data to the product catalogue
    Then I receive an appropriate error response
    And the data has NOT been entered into the database.

