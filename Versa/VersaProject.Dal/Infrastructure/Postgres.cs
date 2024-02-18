﻿using System.Globalization;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Npgsql;
using Npgsql.NameTranslation;
using VersaProject.Dal.Entities;
using VersaProject.Dal.Settings;

namespace VersaProject.Dal.Infrastructure;

public static class Postgres
{
    private static readonly INpgsqlNameTranslator Translator = new NpgsqlSnakeCaseNameTranslator();

    public static void MapCompositeTypes()
    {
        var mapper = NpgsqlConnection.GlobalTypeMapper;
        Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

        mapper.MapComposite<User>("user", Translator);
    }

    public static void AddMigrations(IServiceCollection services)
    {
        services.AddFluentMigratorCore().ConfigureRunner(rb => rb.AddPostgres().WithGlobalConnectionString(s =>
        {
            var cfg = s.GetRequiredService<IOptions<DalOptions>>();
            return cfg.Value.ConnectionString;
        }).ScanIn(typeof(Postgres).Assembly).For.Migrations()).AddLogging(lb => lb.AddFluentMigratorConsole());
    }
}