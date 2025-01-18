namespace Barkeeper.Models.Utility;

public class PagedResult<T> {

    public PagedResult(int page, int pageSize, int totalCount, IEnumerable<T> items, string[] sortBy, SortDirection sortDirection) {
        Page = page;
        PageSize = pageSize;
        TotalCount = totalCount;
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        Items = items;
        SortBy = sortBy;
        SortDirection = sortDirection;
    }

    public int Page { get; set; }

    public int PageSize { get; set; }

    public int TotalCount { get; set; }

    public int TotalPages { get; set; }

    public string[]? SortBy { get; set; }

    public SortDirection SortDirection { get; set; } = SortDirection.Descending;

    public IEnumerable<T> Items { get; set; }

    public bool ValidateSortBy(string[] SortBy, out List<string> InvalidProperties) {
        var validProperties = typeof(T).GetProperties().Select(p => p.Name).ToHashSet(StringComparer.OrdinalIgnoreCase);
        InvalidProperties = [];

        foreach (var property in SortBy) {
            if (!validProperties.Contains(property)) {
                InvalidProperties.Add(property);
            }
        }

        return InvalidProperties.Count == 0;
    }
}

public enum SortDirection {
    Ascending,
    Descending
}
