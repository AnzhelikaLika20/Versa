namespace VersaProject.Dal.Entities;

public record FileData
{
    public required string FileName { get; set; }
    public required string Id { get; set; }
    public required int Version { get; set; }
    public required string UserLogin { get; init; }
    public required DateTime CreationTime { get; init; }
}