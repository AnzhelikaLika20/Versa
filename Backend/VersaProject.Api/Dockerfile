FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["VersaProject.Api/VersaProject.Api.csproj", "VersaProject.Api/"]
COPY ["VersaProject.Bll/VersaProject.Bll.csproj", "VersaProject.Bll/"]
COPY ["VersaProject.Dal/VersaProject.Dal.csproj", "VersaProject.Dal/"]
RUN dotnet restore "VersaProject.Api/VersaProject.Api.csproj"
COPY . .
WORKDIR "/src/VersaProject.Api"
RUN dotnet build "VersaProject.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "VersaProject.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VersaProject.Api.dll"]
