namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; } //im tutorial part 1, 10 3:00 benutzt er ein using für den type Guid, bei mir gab es allerdings kein Fehler
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}