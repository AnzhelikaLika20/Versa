using FluentMigrator;

namespace VersaProject.Dal.Migrations;

[Migration(180220242, TransactionBehavior.None)]
public class InitSchema : Migration {
    public override void Up()
    {
        Create.Table("Users")
            .WithColumn("id").AsInt64().PrimaryKey("user_id").Identity()
            .WithColumn("name").AsString().NotNullable();
    }

    public override void Down()
    {
        Delete.Table("Users");
    }
}