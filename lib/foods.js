$('document').ready(function() {
  $("#add-food").on('click', (event) => {
    handleAddFoodClick(event);
  });

  $("#food-list").on("click", "button", function() {
    $(this).parents("tr").remove();
  });

  $("#food-filter input").on("keyup change", function(event) {
    handleFilterChange(event);
  })
})

const handleAddFoodClick = (event) => {
    event.preventDefault();

    $(".validation-error").html("");

    const $name = $("#name-field input").val();
    const $calories = $("#calories-field input").val();
    const namePresent = $name !== "";
    const caloriesPresent = $calories !== "";

    if (!namePresent || !caloriesPresent) {
      $('#name-field .validation-error').html(
        namePresent ? '' : 'Please Enter a Name'
      );
      $('#calories-field .validation-error').html(
        caloriesPresent ? '' : 'Please Enter Calories'
      );
      return false;
    } else {
      const row = `
        <tr class='food-row'>
          <td class='food-name'>${$name}</td>
          <td class='food-calories'>${$calories}</td>
          <td class='food-delete'><button>-</button></td>
        </tr>
      `;
      $("#food-list tbody").append(row);
      $("#name-field input").val("")
      $("#calories-field input").val("")
    }
};

const handleFilterChange = (event) => {
  const input = event.currentTarget;
  let query = $(input).val();
  $("#food-list tbody tr").each(function() {
    const name = $(this).find(".food-name").html();
    name.toLowerCase().includes(query.toLowerCase()) ?  $(this).show() : $(this).hide();
  });
}
