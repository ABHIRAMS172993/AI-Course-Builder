import { useState } from "react";

import Topbar from "../components/roadmap/Topbar";
import Sidebar from "../components/Sidebar";

// import TopicSidebar from "../components/resources/TopicSidebar";
import ResourceHeader from "../components/resources/ResourceHeader";
import SearchBar from "../components/resources/SearchBar";
import StatsStrip from "../components/resources/StatsStrip";
import FilterBar from "../components/resources/FilterBar";
import ResourceGrid from "../components/resources/ResourceGrid";
import LoadMore from "../components/resources/LoadMore";

import resourcesData from "../data/resourcesData";

const Resources = () => {
  const [resources, setResources] = useState(resourcesData);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const toggleBookmark = (id) => {
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === id
          ? { ...resource, bookmarked: !resource.bookmarked }
          : resource
      )
    );
  };


   const logout = () => {
    localStorage.clear();
    navigate("/login");
  };


  const filteredResources = resources.filter((resource) => {
    const matchesFilter =
      filter === "all" || resource.type === filter;

    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase()) ||
      resource.platform.toLowerCase().includes(search.toLowerCase());

    const matchesTopic =
      selectedTopic === "All Topics" ||
      resource.title.toLowerCase().includes(selectedTopic.toLowerCase()) ||
      resource.description.toLowerCase().includes(selectedTopic.toLowerCase());

    return matchesFilter && matchesSearch && matchesTopic;
  });

  return (
    <div className="bg-bgCanvas min-h-screen font-sans">
      <Topbar />

      <div className="flex">
        {/* Main Navigation */}
        <Sidebar logout={logout}/>

        {/* Topic Filter Sidebar */}
        {/* <TopicSidebar
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        /> */}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <ResourceHeader />

          <SearchBar
            search={search}
            setSearch={setSearch}
            bookmarkedCount={
              resources.filter((r) => r.bookmarked).length
            }
          />

          <StatsStrip resources={resources} />

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            count={filteredResources.length}
          />

          {/* AI Recommendation */}
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-wand-magic-sparkles text-primary text-sm"></i>

            <span className="text-sm font-semibold text-textMain">
              AI-Recommended for Your Current Topic
            </span>

            <span className="text-xs text-textMuted bg-slate-100 px-2 py-0.5 rounded-full">
              React Hooks & State Management
            </span>
          </div>

          <ResourceGrid
            resources={filteredResources}
            toggleBookmark={toggleBookmark}
          />

          <LoadMore
            remaining={36}
            onLoadMore={() => {}}
          />
        </main>
      </div>
    </div>
  );
};

export default Resources;