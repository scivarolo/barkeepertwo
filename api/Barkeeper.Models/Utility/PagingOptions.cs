namespace Barkeeper.Models.Utility;

public class PagingOptions {
    public int Page { get; set; } = 0;

    public int PageSize { get; set; } = 10;

    public SortDirection SortDirection { get; set; } = SortDirection.Descending;
}
