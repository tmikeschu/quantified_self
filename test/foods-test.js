describe('#create-form', function() {
  beforeEach(function() {
    //Clear out all the things
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('validations', function() {
    describe('if I fail to enter both fields', () => {
      beforeEach(() => {
        $('#add-food').click();
      });

      it('then I see both error messages', () => {
        var nameValidationContent = $("#name-field .validation-error").text();
        assert.equal(nameValidationContent, "Please Enter a Name");

        var caloriesValidationContent = $('#calories-field .validation-error').text();
        assert.equal(caloriesValidationContent, 'Please Enter Calories');
      });
      describe('and if I fill in the fields and add the food', () => {
        it('the error messages go away', () => {
          $('#name-field input').val('Banana');
          $('#calories-field input').val('35');
          $('#add-food').click();

          var nameValidationContent = $("#name-field .validation-error").text();
          assert.equal(nameValidationContent, '');

          var caloriesValidationContent = $('#calories-field .validation-error').text();
          assert.equal(caloriesValidationContent, '');
        });
      });
    });

    describe('if I fail to enter a name', () => {
      beforeEach(() => {
        $('#calories-field input').val('35');
        $('#add-food').click();
      });

      it('I see an error message for name', function() {
        var nameValidationContent = $("#name-field .validation-error").text();
        assert.equal(nameValidationContent, "Please Enter a Name");
      });

      it('but not for calories', function() {
        var caloriesValidationContent = $('#calories-field .validation-error').text();
        assert.equal(caloriesValidationContent, '');
      });

      it('and the table is not updated', () => {
        const $rowCount = $("#food-list tbody tr").length;
        assert.equal($rowCount, 0)
      });
    });

    describe('if I fail to enter calories', () => {
      beforeEach(() => {
        $('#name-field input').val('Banana');
        $('#add-food').click();
      });

      it('I see an error message for calories', function() {
        var caloriesValidationContent = $('#calories-field .validation-error').text();
        assert.equal(caloriesValidationContent, 'Please Enter Calories');
      });

      it('but not for name', function() {
        var nameValidationContent = $('#name-field .validation-error').text();
        assert.equal(nameValidationContent, '');
      });

      it('and the table is not updated', () => {
        const $rowCount = $("#food-list tbody tr").length;
        assert.equal($rowCount, 0)
      });
    })

    it('will be nice to me if I do everything correctly', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('35');
      $('#add-food').click();

      var nameValidationContent = $('#name-field .validation-error').text();
      assert.equal(nameValidationContent, '');

      var caloriesValidationContent = $('#calories-field .validation-error').text();
      assert.equal(caloriesValidationContent, '');
    });
  });

  context('Adding foods', function() {
    describe('when I add a food', () => {

      it('a row is added to the table', function() {
        let $rowCount = $("#food-list tbody tr").length;
        assert.equal($rowCount, 0)

        $('#name-field input').val('Banana');
        $('#calories-field input').val('35');
        $('#add-food').click();

        $rowCount = $("#food-list tbody tr").length;
        assert.equal($rowCount, 1)

        const $tableRow = $('#food-list tbody tr:first');
        const $rowFoodName = $tableRow.find('td:first').html();
        const $rowFoodCalories = $tableRow.find('td:nth-of-type(2)').html();
        assert.equal($rowFoodName, 'Banana')
        assert.equal($rowFoodCalories, '35')
      });

      it('and the input fields are cleared', () => {
        $('#name-field input').val('Banana');
        $('#calories-field input').val('35');

        let nameField = $("#name-field input")
        let caloriesField = $("#calories-field input");

        assert.equal(nameField.val(), 'Banana')
        assert.equal(caloriesField.val(), '35')

        $('#add-food').click();

        assert.equal(nameField.val(), '');
        assert.equal(caloriesField.val(), '');
      });
    });
  })

  context('Deleting foods', () => {
    describe('when I click the red delete icon', () => {
      it('the row is removed from the table', () => {
        $('#name-field input').val('Banana');
        $('#calories-field input').val('35');
        $('#add-food').click();

        let $rows = $("#food-list tbody tr");
        assert.equal($rows.length, 1)

        $("tbody tr:first").find("button").click()

        $rows = $("#food-list tbody tr");
        assert.equal($rows.length, 0)
      });
    });
  });

  context('Filtering foods', () => {
    describe('when I type in the filtering field', () => {
      beforeEach(() => {
        $('#name-field input').val('Banana');
        $('#calories-field input').val('35');
        $('#add-food').click();

        $('#name-field input').val('Butter');
        $('#calories-field input').val('100');
        $('#add-food').click();

        $('#name-field input').val('Peanut Butter');
        $('#calories-field input').val('100');
        $('#add-food').click();
      });

      it('the results change after one keypress', () => {
        let $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        })
        assert.equal($rows.length, 3)

        $('#food-filter input').val("P").keyup();

        $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        }).length

        assert.equal($rows, 1)
      });

      it('the results change with each keypress', () => {
        let $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        })
        assert.equal($rows.length, 3)

        $('#food-filter input').val("n").keyup();

        $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        })

        assert.equal($rows.length, 2)

        const filterValue = $('#food-filter input').val()
        $('#food-filter input').val(filterValue + 'u').keyup();
        $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        })

        assert.equal($rows.length, 1)
      });

      it('the search is case insensitive', () => {
        $('#food-filter input').val("p").keyup();

        $rows = $("#food-list tbody tr").filter(function() {
          return $(this).css('display') !== 'none';
        })

        assert.equal($rows.length, 1)
      });
    });
  });
});
