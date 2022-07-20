uint256 percentage = 30;
function splitAmountToOwnerAndSeller(uint256 amount)
    internal
    view
    returns (uint256 amountForSender, uint256 amountForOwner)
{
    amountForSender = (amount * (100 - percentage)) / 100;
    amountForOwner = (amount * percentage) / 100;
}