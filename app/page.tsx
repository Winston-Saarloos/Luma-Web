"use client";

import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { WeatherWidget } from "@/components/widgets/weather-widget/weather-widget";
import { QuickActionsWidget } from "@/components/widgets/quick-actions-widget/quick-actions-widget";
import { SearchWidget } from "@/components/widgets/search-widget/search-widget";
import { CalendarWidget } from "@/components/widgets/calendar-widget/calendar-widget";
import { StatsWidget } from "@/components/widgets/stats-widget/stats-widget";
import { ThemeToggleWidget } from "@/components/widgets/theme-toggle-widget/theme-toggle-widget";
import { NotesWidget } from "@/components/widgets/notes-widget/notes-widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define the layout for different screen sizes
  const layouts = {
    lg: [
      { i: "weather", x: 0, y: 0, w: 3, h: 2 },
      { i: "quick-actions", x: 3, y: 0, w: 3, h: 2 },
      { i: "search", x: 6, y: 0, w: 6, h: 2 },
      { i: "calendar", x: 0, y: 2, w: 6, h: 3 },
      { i: "stats", x: 6, y: 2, w: 6, h: 2 },
      { i: "theme-toggle", x: 6, y: 4, w: 3, h: 1 },
      { i: "notes", x: 9, y: 4, w: 3, h: 1 },
    ],
    md: [
      { i: "weather", x: 0, y: 0, w: 4, h: 2 },
      { i: "quick-actions", x: 4, y: 0, w: 4, h: 2 },
      { i: "search", x: 8, y: 0, w: 4, h: 2 },
      { i: "calendar", x: 0, y: 2, w: 6, h: 3 },
      { i: "stats", x: 6, y: 2, w: 6, h: 2 },
      { i: "theme-toggle", x: 6, y: 5, w: 3, h: 1 },
      { i: "notes", x: 9, y: 5, w: 3, h: 1 },
    ],
    sm: [
      { i: "weather", x: 0, y: 0, w: 6, h: 2 },
      { i: "quick-actions", x: 6, y: 0, w: 6, h: 2 },
      { i: "search", x: 0, y: 2, w: 12, h: 2 },
      { i: "calendar", x: 0, y: 4, w: 12, h: 3 },
      { i: "stats", x: 0, y: 7, w: 12, h: 2 },
      { i: "theme-toggle", x: 0, y: 9, w: 6, h: 1 },
      { i: "notes", x: 6, y: 9, w: 6, h: 1 },
    ],
    xs: [
      { i: "weather", x: 0, y: 0, w: 12, h: 2 },
      { i: "quick-actions", x: 0, y: 2, w: 12, h: 2 },
      { i: "search", x: 0, y: 4, w: 12, h: 2 },
      { i: "calendar", x: 0, y: 6, w: 12, h: 3 },
      { i: "stats", x: 0, y: 9, w: 12, h: 2 },
      { i: "theme-toggle", x: 0, y: 11, w: 12, h: 1 },
      { i: "notes", x: 0, y: 12, w: 12, h: 2 },
    ],
  };

  const widgets = {
    weather: <WeatherWidget />,
    "quick-actions": <QuickActionsWidget />,
    search: <SearchWidget />,
    calendar: <CalendarWidget />,
    stats: <StatsWidget />,
    "theme-toggle": <ThemeToggleWidget />,
    notes: <NotesWidget />,
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Responsive Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-white/80 text-lg">
            Welcome to your personalized workspace
          </p>
        </div>

        {/* Grid Layout */}
        <div className="w-full">
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            rowHeight={120}
            isDraggable={true}
            isResizable={true}
            margin={[16, 16]}
            containerPadding={[0, 0]}
            useCSSTransforms={true}
            compactType="vertical"
            preventCollision={false}
          >
            {Object.entries(widgets).map(([key, widget]) => (
              <div key={key} className="widget-container">
                {widget}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>

      <style jsx global>{`
        .react-grid-item {
          transition: all 200ms ease;
          transition-property: left, top, width, height;
        }

        .react-grid-item.cssTransforms {
          transition-property: transform, width, height;
        }

        .react-grid-item.resizing {
          z-index: 1;
          will-change: width, height;
        }

        .react-grid-item.react-draggable-dragging {
          transition: none;
          z-index: 3;
          will-change: transform;
        }

        .react-grid-item.react-grid-placeholder {
          background: rgba(255, 255, 255, 0.1);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          transition-duration: 100ms;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }

        .react-grid-item > .react-resizable-handle {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          z-index: 10;
        }

        .react-grid-item > .react-resizable-handle::after {
          content: "";
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 5px;
          height: 5px;
          border-right: 2px solid rgba(255, 255, 255, 0.4);
          border-bottom: 2px solid rgba(255, 255, 255, 0.4);
        }

        .widget-container {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
