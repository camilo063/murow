import {
  DollarSign,
  Plug,
  Lock,
  Zap,
  Users,
  Shield,
  BarChart3,
  Mail,
  Smartphone,
  Target,
  Check,
  X,
  AlertTriangle,
  Clock,
  Eye,
  Gauge,
  Gift,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Plug,
  Lock,
  Zap,
  Users,
  Shield,
  BarChart3,
  Mail,
  Smartphone,
  Target,
  Check,
  X,
  AlertTriangle,
  Clock,
  Eye,
  Gauge,
  Gift,
  Globe,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Zap;
}
