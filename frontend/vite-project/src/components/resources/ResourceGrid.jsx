import ResourceCard from "./ResourceCard";

const ResourceGrid = ({ resources, toggleBookmark }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

export default ResourceGrid;